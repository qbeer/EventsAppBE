import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {
    // tslint:disable:member-access
    @PrimaryGeneratedColumn()
    id?: number | undefined;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    eventDate?: Date | undefined;

    @Column({ type: "text", nullable: false })
    eventDescription: string | undefined;

    @Column({type: "varchar", length: 45, nullable: false})
    eventHost: string | undefined;

    @Column({type: "int", nullable: true})
    maxParticipants?: number | undefined;

    @Column({type: "varchar", length: 45, nullable: false})
    eventLocation: string | undefined;
}
