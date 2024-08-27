export interface ITopic {
    companyId: string,
    description:string,
    id:string
}

export interface ITopicCreate{
    description:string,
    companyId:string
}

export interface IPublicTopic{
    id:string
    description:string
}