import { IsNumber } from "class-validator";

export class GetMessagesDto {
    @IsNumber()
    receiverId: number

    @IsNumber()
    skip: number
}