import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { MessagesService } from "./messages.service";
import { MessageDto } from "./dto/message.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { GetMessagesDto } from "./dto/get-messages.dto";

@Controller('messages')
export class MessagesController {
    constructor(private readonly messagesService: MessagesService) {}

    @UseGuards(JwtAuthGuard)
    @Post('/send')
    async sendMessage(@Request() request, @Body() messageDto: MessageDto) {
        await this.messagesService.createMessage(request.user.id, messageDto.receiverId, messageDto.content)
    }

    @UseGuards(JwtAuthGuard)
    @Post('/fetch')
    async fetchMessages(@Request() request, @Body() getMessagesDto: GetMessagesDto) {
        return await this.messagesService.fetchMessages(request.user.id, getMessagesDto.receiverId, getMessagesDto.skip)
    }
}