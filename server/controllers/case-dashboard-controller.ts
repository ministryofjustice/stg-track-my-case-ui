/* eslint-disable import/prefer-default-export */
import { NextFunction, Request, Response } from 'express'
import { initialiseBasicAuthentication } from '../helpers/initialise-basic-authentication'

const caseDashboardController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await initialiseBasicAuthentication(req, res, next)

    res.locals.pageTitle = 'Your case dashboard'
    res.locals.caseReference = req.session.selectedCrn
    res.locals.pageTitleCaseReference = ` - Reference number: ${res.locals.caseReference}`
    res.render('pages/case/dashboard.njk')
  } catch (error) {
    next(error)
  }
}

export { caseDashboardController }
