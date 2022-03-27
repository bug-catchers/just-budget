import { Selector } from 'testcafe';

class CreatePlannerPage {
  constructor() {
    this.pageId = '#create-planner-page';
    this.pageSelector = Selector(this.pageId);
  }

  /** Checks that this page is currently displayed. */
  async isDisplayed(testController) {
    await testController.expect(this.pageSelector.exists).ok();
  }

  /** Fills out and submits the form to signin, then checks to see that login was successful. */
  async createPlanner(testController, year, initialBalance) {
    await this.isDisplayed(testController);
    await testController.typeText('#create-planner-year', year);
    await testController.click('#create-planner-month');
    await testController.click('#create-planner-month');
    // await testController.click('#create-planner-1');
    await testController.typeText('#create-planner-balance', initialBalance);
    await testController.click('#create-planner-create');
  }
}

export const createPlannerPage = new CreatePlannerPage();
