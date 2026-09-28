import { spawn } from 'node:child_process';

const args = process.argv.slice(2);
let port = process.env.npm_config_port || process.env.PORT || '3000';
let host = '0.0.0.0';

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === '--port' || arg === '-p') {
    if (args[i + 1] && /^\d+$/.test(args[i + 1])) {
      port = args[++i];
    }
  } else if (arg.startsWith('--port=')) {
    const val = arg.split('=')[1];
    if (/^\d+$/.test(val)) port = val;
  } else if (arg === '--host' || arg === '-H' || arg === '--hostname') {
    if (args[i + 1]) {
      host = args[++i];
    }
  } else if (arg.startsWith('--host=') || arg.startsWith('--hostname=')) {
    host = arg.split('=')[1];
  } else if (/^\d+$/.test(arg)) {
    port = arg;
  }
}

const child = spawn('npx', ['next', 'start', '-p', port, '-H', host], {
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    PORT: port,
    HOSTNAME: host,
  },
});

process.on('SIGTERM', () => child.kill('SIGTERM'));
process.on('SIGINT', () => child.kill('SIGINT'));

child.on('exit', (code, signal) => {
  process.exit(code ?? (signal ? 1 : 0));
});
