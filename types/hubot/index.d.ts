// Type definitions for hubot 2.19
// Project: https://github.com/github/hubot
// Definitions by: Dirk Gadsden <https://github.com/dirk>
//                 Kees C. Bakker <https://github.com/KeesCBakker>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace Hubot {
    class Brain {
        set(key: any, value: any): any;
        get(key: any): any;
        save(): void;
        close(): void;
        setAutoSave(enabled: boolean): void;
        resetSaveInterval(seconds: number): void;
        mergeData(data: any): void;
        userForId(id: any): User;
        userForId(id: any, options: any): User;
        userForName(name: string): User;
        usersForRawFuzzyName(fuzzyName: string): User[];
        usersForFuzzyName(fuzzyName: string): User[];
    }

    class User {
        id: any;
        name: string;
    }

    class Message {
        user: User;
        done: boolean;
        room: Room;
    }

    class TextMessage extends Message {
        text: string;
        id: any;

        match(regex: RegExp): RegExpMatchArray;
        toString(): string;
    }

    class EntryMessage extends Message{}
    class LeaveMessage extends Message{}
    class TopicMessage extends TextMessage{}
    class CatchAllMessage extends Message {
      message: Message;
    }

    class Response<R> {
        robot: Robot;
        message: Message;
        match: RegExpMatchArray;
        envelope: { room: Room, user: User, message: Message };


        constructor(robot: R, message: Message, match: RegExpMatchArray);
        send(...strings: string[]): void;
        emote(...strings: string[]): void;
        reply(...strings: string[]): void;
        topic(...strings: string[]): void;
        play(...strings: string[]): void;
        random<T>(items: T[]): T;
    }

    type ListenerCallback<R> = (response: Response<R>) => void;

    class Robot<A> {
        alias: string;
        brain: Brain;
        name: string;
        readonly adapter: A;

        constructor(adapterPath: string, adapter: string, httpd: boolean, name: string, alias?: string);
        hear(regex: RegExp, callback: ListenerCallback<this>): void;
        hear(regex: RegExp, options: any, callback: ListenerCallback<this>): void;
        helpCommands(): string[];
        loadFile(directory: string, fileName: string): void;
        respond(regex: RegExp, callback: ListenerCallback<this>): void;
        respond(regex: RegExp, options: any, callback: ListenerCallback<this>): void;
    }
}

// Compatibility with CommonJS syntax exported by Hubot's CoffeeScript.
// tslint:disable-next-line export-just-namespace
export = Hubot;
export as namespace Hubot;
