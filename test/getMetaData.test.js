/**
 * This is a unit test file.
 * 
 * @since 1.0.0
 */

var axios = require("axios");
var MockAdapter = require("axios-mock-adapter");
var mock = new MockAdapter(axios);

//test the controller getMetaData - API test. 
describe("POST getMetaData ", () => {
    it("Get meta data from given url", async (done) => {
         mock.onAny("/getMetaData").reply(200);
        done();
    });
  });