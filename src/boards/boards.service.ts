import { Injectable } from '@nestjs/common';
import { find, isNaN, pick } from 'lodash';
import { MocksService } from 'src/mocks/mocks.service';

@Injectable()
export class BoardsService {
  constructor(private readonly mocksService: MocksService) {}

  async findCategories() {
    const categories = await this.mocksService.getCategories();
    return {
      code: 200,
      data: categories,
    };
  }

  async findByRequired() {
    const requires = await this.mocksService.getRequires();
    return {
      code: 200,
      data: requires,
    };
  }

  async find({ moimId, page, size, categoryId }) {
    const moims = await this.mocksService.getMoims();
    const found = find(moims, { id: moimId });
    if (found) {
      const results = [];
      found.boards.forEach((board) => {
        const partial = pick(board, [
          'id',
          'profileImage',
          'memberName',
          'title',
          'createDate',
          'updateDate',
          'boardImage',
          'likeCount',
          'boardCategory',
        ]);
        if (
          isNaN(Number(categoryId)) ||
          board.boardCategory.id === Number(categoryId)
        ) {
          results.push(partial);
        }
      });
      return {
        code: 200,
        data: {
          totalCount: results.length,
          hasMore: results.length / size > page,
          items: results.slice(size * (page - 1), size * page),
        },
      };
    }
    return {
      code: 404,
      message: '존재하지 않는 모임입니다.',
    };
  }

  async findOne({ userId, moimId, boardId }) {
    const moims = await this.mocksService.getMoims();
    const moim = find(moims, { id: moimId });
    if (moim) {
      const found = find(moim.boards, { id: boardId });
      if (found) {
        const isLike = found.likeMemberIds.indexOf(userId) >= 0;
        const partial = pick(found, [
          'id',
          'profileImage',
          'memberName',
          'title',
          'content',
          'createDate',
          'updateDate',
          'boardImage',
          'likeCount',
          'commentCount',
          'boardCategory',
        ]);
        return {
          code: 200,
          data: {
            isLike,
            ...partial,
          },
        };
      }
      return {
        code: 404,
        message: '존재하지 않는 게시글입니다.',
      };
    }
    return {
      code: 404,
      message: '존재하지 않는 모임입니다.',
    };
  }
}
