const production = process.env.NODE_ENV === 'production'

function get<T>(name: string, fallback: T, options = { requireInProduction: false }): T | string {
  if (process.env[name]) {
    return process.env[name]
  }
  if (fallback !== undefined && (!production || !options.requireInProduction)) {
    return fallback
  }
  throw new Error(`Missing env var ${name}`)
}

const requiredInProduction = { requireInProduction: true }

export class AgentConfig {
  // Sets the working socket to timeout after timeout milliseconds of inactivity on the working socket.
  timeout: number

  constructor(timeout = 8000) {
    this.timeout = timeout
  }
}

export interface ApiConfig {
  url: string
  timeout: {
    // sets maximum time to wait for the first byte to arrive from the server, but it does not limit how long the
    // entire download can take.
    response: number
    // sets a deadline for the entire request (including all uploads, redirects, server processing time) to complete.
    // If the response isn't fully downloaded within that time, the request will be aborted.
    deadline: number
  }
  agent: AgentConfig
}

export default {
  buildNumber: get('BUILD_NUMBER', '1_0_0', requiredInProduction),
  productId: get('PRODUCT_ID', 'UNASSIGNED', requiredInProduction),
  gitRef: get('GIT_REF', 'xxxxxxxxxxxxxxxxxxx', requiredInProduction),
  branchName: get('GIT_BRANCH', 'xxxxxxxxxxxxxxxxxxx', requiredInProduction),
  production,
  https: process.env.NO_HTTPS === 'true' ? false : production,
  staticResourceCacheDuration: '1h',
  environmentName: get('ENVIRONMENT_NAME', ''),
  redis: {
    enabled: get('REDIS_ENABLED', 'false', requiredInProduction) === 'true',
    // host: get('REDIS_HOST', 'localhost', requiredInProduction),
    // port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    // password: process.env.REDIS_AUTH_TOKEN,
    // tls_enabled: get('REDIS_TLS_ENABLED', 'false'),
  },
  apis: {
    trackMyCaseApi: {
      url: get('TRACK_MY_CASE_API_URL', 'http://localhost:4550', requiredInProduction),
      timeout: {
        response: Number(get('TRACK_MY_CASE_API_TIMEOUT_RESPONSE', 30000)),
        deadline: Number(get('TRACK_MY_CASE_API_TIMEOUT_DEADLINE', 30000)),
      },
      agent: new AgentConfig(Number(get('TRACK_MY_CASE_API_TIMEOUT_RESPONSE', 15000))),
      enabled: get('TRACK_MY_CASE_API_ENABLED', 'false') === 'true',
    },
  },
  session: {
    secret: get('SESSION_SECRET', 'app-insecure-default-session', requiredInProduction),
    expiryMinutes: Number(get('WEB_SESSION_TIMEOUT_IN_MINUTES', 120)),
  },
}
