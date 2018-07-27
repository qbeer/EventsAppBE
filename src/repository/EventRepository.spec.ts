import { Connection, createConnection } from "typeorm";
import { Event } from "../model/Event";
import { EventRepository } from "./EventRepository";

function getMockEvent(): Event {
    return {
        eventDate: new Date(),
        eventDescription: "test",
        eventHost: "Alex Olar",
        eventLocation: "Budapest, Hungary",
        maxParticipants: 10};
}

describe("EventRepository tests", () => {

    let testConnection: Connection;
    let repository: EventRepository;

    beforeAll( async () => {
        testConnection = await createConnection("test");
        repository = new EventRepository("test");
    });

    describe("Create new repository", () => {
        it("should be able to create a new repo", () => {
            expect(repository).toBeTruthy();
        });
    });

    describe("Save item to repository", () => {
        it("should be save a new event", async () => {
            expect( await repository.save(getMockEvent()) ).toBeTruthy();
        });
    });

    describe("Get all events from DB", () => {
        it("should return an array of events from DB", async () => {
            expect( await repository.getAll() ).toHaveLength(1);
        });
    });

    afterAll(() => {
        testConnection.close();
    });

});
