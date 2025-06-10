// logger.js
import chalk from 'chalk';

const getShortTimestamp = () => {
  const now = new Date();
  return now.toTimeString().split(' ')[0]; // HH:mm:ss
};

const formatMessage = ({ level, method, statusCode, message }) => {
  const timestamp = chalk.gray(getShortTimestamp());
  const methodLabel = method ? chalk.magenta(method) : '';
  const codeLabel = statusCode
    ? statusCode >= 500
      ? chalk.redBright(statusCode)
      : statusCode >= 400
        ? chalk.yellowBright(statusCode)
        : chalk.greenBright(statusCode)
    : '';

  return `${timestamp} [${level}] ${methodLabel} ${codeLabel} - ${message}`;
};

const logger = {
  info: (message, method = null, statusCode = null) => {
    console.log(
      formatMessage({
        level: chalk.blue('INFO'),
        method,
        statusCode,
        message: chalk.cyan(message),
      })
    );
  },
  warn: (message, method = null, statusCode = null) => {
    console.warn(
      formatMessage({
        level: chalk.yellow('WARN'),
        method,
        statusCode,
        message: chalk.yellowBright(message),
      })
    );
  },
  error: (message, method = null, statusCode = null) => {
    console.error(
      formatMessage({
        level: chalk.red('ERROR'),
        method,
        statusCode,
        message: chalk.redBright(message),
      })
    );
  },
};

export default logger;
