import { EventRepository } from "./EventRepository";

describe("EventRepository tests", () => {

    describe("Create new repository", () => {
        it("should be able to create a new repo", () => {
            expect( new EventRepository() ).toBeTruthy();
        });
    });

});
