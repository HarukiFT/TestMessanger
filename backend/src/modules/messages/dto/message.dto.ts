import { IsNumber, IsString } from "class-validator";

export class MessageDto {
    @IsString()
    content: string

    @IsNumber()
    receiverId: number
}