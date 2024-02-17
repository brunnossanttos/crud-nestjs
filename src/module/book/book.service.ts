import { Injectable } from '@nestjs/common';
import { BookDTO } from './book.dto';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class BookService {
  constructor(private prismaClient: PrismaService) {}

  async create(data: BookDTO) {
    const bookExist = await this.prismaClient.book.findFirst({
      where: { barCode: data.barCode },
    });

    if (bookExist) {
      throw new Error('Book already exists');
    }

    const book = await this.prismaClient.book.create({ data });

    return book;
  }

  async findAll() {
    return this.prismaClient.book.findMany();
  }

  async update(id: string, data: BookDTO) {
    const bookExist = await this.prismaClient.book.findUnique({
      where: { id },
    });

    if (!bookExist) {
      throw new Error('Book do not exists');
    }

    return await this.prismaClient.book.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    const bookExist = await this.prismaClient.book.findUnique({
      where: { id },
    });

    if (!bookExist) {
      throw new Error('Book do not exists');
    }

    return await this.prismaClient.book.delete({
      where: { id },
    });
  }
}
