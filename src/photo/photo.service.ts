import { Injectable } from "@nestjs/common";
import { Photo, Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class PhotoService {
  constructor(private prisma: PrismaService) {}

  async createPhoto(request) {
    const { id, width, height, alt_description, user, urls, userId } = request;

    const { regular, thumb } = urls;
    const { name, profile_image, links } = user;

    const findPhoto = await this.findPhotoById(id);

    if (findPhoto) {
      const updatePhoto = await this.updateLike(id, findPhoto.like);
      return updatePhoto;
    } else {
      const photo = {
        id,
        width,
        height,
        like: true,
        alt_description,
        regular_url: regular,
        thumb_url: thumb,
        user_name: name,
        user_links_html: links.html,
        user_profile_image_medium: profile_image.medium,
        user: {
          connect: { id: userId },
        },
      };

      const createPhoto = await this.prisma.photo.create({
        data: photo,
      });
      return createPhoto;
    }
  }

  async findPhotoById(id: string) {
    const photo = await this.prisma.photo.findFirst({
      where: { id },
    });
    return photo;
  }

  async updateLike(id: string, status: boolean) {
    const photo = await this.prisma.photo.update({
      where: { id },
      data: {
        like: !status,
      },
    });
    return photo;
  }

  async findAll(userId: string, query) {
    const { skip } = query;

    const photos = await this.prisma.photo.findMany({
      take: 10,
      skip: parseInt(skip),
      where: {
        userId,
        like: true,
      },
      orderBy: {
        createAt: "asc",
      },
    });
    console.log(photos.length)
    return photos;
  }
}
