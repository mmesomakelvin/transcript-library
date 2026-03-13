// =============================================================================
// Transcript Library — pm2 Ecosystem Config
// =============================================================================
// Run from the current release symlink. The deploy script symlinks .env.local
// into each release directory, so Next.js picks it up automatically.
//
// Usage:
//   pm2 start /opt/transcript-library/current/deploy/ecosystem.config.cjs
// =============================================================================

module.exports = {
  apps: [
    {
      name: "transcript-library",
      cwd: "/opt/transcript-library/current",
      script: "npm",
      args: "run start",
      max_restarts: 10,
      restart_delay: 5000,
      exp_backoff_restart_delay: 100,
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      // Logging — pm2 manages rotation via pm2-logrotate module
      error_file: "/srv/transcript-library/logs/pm2-error.log",
      out_file: "/srv/transcript-library/logs/pm2-out.log",
      merge_logs: true,
      time: true,
    },
  ],
};
