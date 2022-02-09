import { Injectable } from '@nestjs/common';
import { find, pick } from 'lodash';
import { MocksService } from 'src/mocks/mocks.service';

@Injectable()
export class MoimsService {
  constructor(private readonly mocksService: MocksService) {}

  async find({ page, size }) {
    const moims = await this.mocksService.getMoims();
    return {
      code: 200,
      data: {
        totalCount: moims.length,
        hasMore: moims.length / size > page,
        items: moims
          .slice(size * (page - 1), size * page)
          .map((moim) =>
            pick(moim, [
              'id',
              'image',
              'moimName',
              'area',
              'moimLocation',
              'moimMemberCount',
            ]),
          ),
      },
    };
  }

  async findOne(id) {
    const moims = await this.mocksService.getMoims();
    const found = find(moims, { id });
    if (found) {
      return {
        code: 200,
        data: {
          image: found.image,
          moimName: found.moimName,
          moimDetail: found.moimDetail,
        },
      };
    }
    return {
      code: 404,
      message: '존재하지 않는 모임입니다.',
    };
  }

  async findMeetings({ id, page, size }) {
    const moims = await this.mocksService.getMoims();
    const found = find(moims, { id });
    if (found) {
      const meetings = found.meetings;
      return {
        code: 200,
        data: {
          totalCount: meetings.length,
          hasMore: meetings.length / size > page,
          items: meetings.slice(size * (page - 1), size * page),
        },
      };
    }
    return {
      code: 404,
      message: '존재하지 않는 모임입니다.',
    };
  }

  async findMembers({ id, page, size }) {
    const moims = await this.mocksService.getMoims();
    const found = find(moims, { id });
    if (found) {
      const members = found.members;
      return {
        code: 200,
        data: {
          totalCount: members.length,
          hasMore: members.length / size > page,
          items: members.slice(size * (page - 1), size * page),
        },
      };
    }
    return {
      code: 404,
      message: '존재하지 않는 모임입니다.',
    };
  }
}
