import { WAGroupMetadata } from '@adiwajshing/baileys'

export * from './message'
export * from './command'
export * from './mongo'
export interface IConfig {
    name: string
    mods?: string[]
    prefix: string
    session: string
    mods: string[]
    gkey: string
    chatBotUrl: string
    geniuskey: string
    malUsername: string
    malPassword: string
}

export interface IParsedArgs {
    args: string[]
    flags: string[]
    joined: string
}

export interface IExtendedGroupMetadata extends WAGroupMetadata {
    admins?: string[]
}

export interface ISession {
    clientID: string
    serverToken: string
    clientToken: string
    encKey: string
    macKey: string
}

export interface IGroup {
    jid: string
    events: boolean
    nsfw: boolean
    safe: boolean
    mod: boolean
    cmd: boolean
    invitelink: boolean
    news: boolean
    bot: string
    haigushaResponse: {
      name: string;
      id: number;
      claimable: boolean;
    };
    quizResponse: {
      id: number;
      answer: number;
      ongoing: boolean;
      startedBy: string;
    };
}

export interface IUser {
    jid: string
    ban: boolean
    warnings: number
    Xp: number
    wallet: number;
    bank: number;
    coin: number;
    lastDaily: number;
    lastRob: number;
    haigusha: {
      name: string;
      id: number;
    };
    married: boolean;
 ​   ​lastQuizId​: ​number​; 
 ​   ​quizPoints​: ​number​;
}

export interface ICountdown {
  jid: string;
  slot: number;
  gamble: number;
  rob: number;
  haigusha: number;
  marry: number;
  divorce: number;
}

export interface IFeature {
    feature: string
    state: boolean
    jids: string[]
    id: string

}

export interface IPackage {
    description: string
    dependencies: { [key: string]: string }
    homepage: string
    repository: {
        url: string
    }
}
