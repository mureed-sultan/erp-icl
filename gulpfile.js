const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const http = require('http');
const { exec } = require('child_process');
const reload = browserSync.reload;

function isApacheTomcatRunning() {
  return new Promise((resolve) => {
    const options = {
      host: 'localhost',
      port: 8080,
      timeout: 2000
    };

    const req = http.request(options, (res) => {
      resolve(res.statusCode === 200);
    });

    req.on('error', (err) => {
      resolve(false);
    });

    req.end();
  });
}

function startApacheTomcat() {
  return new Promise((resolve) => {
    exec('start .\\apache-tomcat.lnk', (err) => {
      if (err) {
        console.error('Error starting Apache Tomcat:', err);
        resolve(false);
      } else {
        console.log('Apache Tomcat started successfully.');
        resolve(true);
      }
    });
  });
}

function waitForApacheTomcat() {
  return new Promise(async (resolve) => {
    let maxAttempts = 30;
    while (maxAttempts > 0) {
      const isRunning = await isApacheTomcatRunning();
      if (isRunning) {
        console.log('Apache Tomcat is now running.');
        resolve();
        break;
      }
      maxAttempts--;
      await new Promise((innerResolve) => setTimeout(innerResolve, 2000));
    }
    if (maxAttempts === 0) {
      console.log('Apache Tomcat failed to start within the specified time.');
      resolve();
    }
  });
}

gulp.task('serve', async function(done) {
  const apacheRunning = await isApacheTomcatRunning();
  if (!apacheRunning) {
    const apacheStarted = await startApacheTomcat();
    if (!apacheStarted) {
      console.log('Failed to start Apache Tomcat. Exiting...');
      return;
    }
  } else {
    console.log('Apache Tomcat is already running.');
  }

  await waitForApacheTomcat();

  browserSync.init({
    proxy: 'http://localhost:8080/erp-icl/login',
    port: 3000,
    notify: false,
    reloadDebounce: 500
  });

  gulp.watch('WEB-INF/**/*.jsp').on('change', function() {
    reload();
  }); 
  gulp.watch('resources/**/*.js').on('change', function() {
    reload();
  });  
  gulp.watch('resources/**/*.css').on('change', function() {
    reload();
  });

  done();
});

gulp.task('default', gulp.series('serve'));
