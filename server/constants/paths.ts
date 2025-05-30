const paths = {
  HEALTH: '/health',

  CASES: {
    HEARINGS: '/cases/:caseId/hearings',
    // TODO: Replace with dynamic caseId path once API contract is finalized
    INFO: '/case/:caseId/courtschedule',
    CASE_DETAILS: '/case/:urn/casedetails',
  },

  COURT_HOUSE: {
    DETAIL: '/courthouses/:courtHouseId',
  },
}

export default paths
