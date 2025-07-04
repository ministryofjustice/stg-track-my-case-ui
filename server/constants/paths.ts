const paths = {
  START: '/',
  HEALTH: '/health',

  AUTH_ERROR: '/autherror',

  PASSPORT: {
    // these routes are reserved for passport integration
    SIGN_IN: '/sign-in',
    SIGN_OUT: '/sign-out',
    AUTH_CALLBACK: '/oidc/authorization-code/callback',
  },

  ONE_LOGIN: {
    // OneLogin redirection URLs
    SIGNED_IN: '/signed-in',
    SIGNED_OUT: '/signed-out',
    AUTH_ERROR: '/authentication-error',
    BACK_CHANNEL_LOGOUT_URI: '/back-channel-logout-uri',
  },

  CASES: {
    SELECT: '/case/select',
    DASHBOARD: '/case/dashboard',
    HEARINGS: '/cases/:caseId/hearings',
    // TODO: Replace with dynamic caseId path once API contract is finalized
    INFO: '/case/:caseId/courtschedule',
    CASE_DETAILS: '/case/:urn/casedetails',
    ASSOCIATIONS: '/cases/:sub',
  },

  COURT_HOUSE: {
    DETAIL: '/courthouses/:courtHouseId',
  },
}

export default paths
