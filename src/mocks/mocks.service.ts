import { Injectable } from '@nestjs/common';
import { Chance } from 'chance';
import { format, addDays } from 'date-fns';

const chance = new Chance('ko-KR');
let boardId = 1;
const mocks: any = {
  users: [
    {
      userId: 1,
      username: 'raina',
      password: 'raina1234',
    },
    {
      userId: 2,
      username: 'ward',
      password: 'ward1234',
    },
  ],
  moims: [
    {
      id: 1,
      image:
        'https://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.jpg',
      area: '일일구',
      moimLoction: '일체육관',
      moimName: '🌲포텐셜🌲',
      moimMemberCount: 120,
    },
    {
      id: 2,
      image:
        'https://mblogthumb-phinf.pstatic.net/MjAxNzA0MDJfMTc3/MDAxNDkxMTE1MzMwNDE0.fFSta6n3NHFuh4GLiFwa3h2SCOARn_RrKMx0jBjjgRcg.eTfmSKIo9xs-qLkWaeS7QRKiG03LLXk1FBAefUEWj90g.JPEG.hello286668/%EB%B0%B0%EB%93%9C%EB%AF%BC%ED%84%B4%EC%9D%B4%EB%AF%B8%EC%A7%80_1.jpg?type=w800',
      area: '기억구',
      moimLoction: '구구체육관',
      moimName: '나무모임',
      moimMemberCount: 98,
    },
    {
      id: 3,
      image:
        'https://newsimg.hankookilbo.com/cms/articlerelease/2021/07/31/8f8a6f47-ad4a-468e-9fd1-cb4f89a03ddd.jpg',
      area: '노원구',
      moimLoction: '미성체육관',
      moimName: '배라',
      moimMemberCount: 12,
    },
    {
      id: 4,
      image:
        'https://img.etoday.co.kr/pto_db/2021/07/600/20210729144254_1649771_1199_799.jpg',
      area: '성동구',
      moimLoction: '일체육관',
      moimName: '이슬콕콕',
      moimMemberCount: 97,
    },
    {
      id: 5,
      image:
        'https://mblogthumb-phinf.pstatic.net/MjAxNzA0MDJfMTc3/MDAxNDkxMTE1MzMwNDE0.fFSta6n3NHFuh4GLiFwa3h2SCOARn_RrKMx0jBjjgRcg.eTfmSKIo9xs-qLkWaeS7QRKiG03LLXk1FBAefUEWj90g.JPEG.hello286668/%EB%B0%B0%EB%93%9C%EB%AF%BC%ED%84%B4%EC%9D%B4%EB%AF%B8%EC%A7%80_1.jpg?type=w800',
      area: '강북구',
      moimLoction: '삼삼체육관',
      moimName: '안녕하세요',
      moimMemberCount: 100,
    },
    {
      id: 6,
      image:
        'https://www.sciencetimes.co.kr/wp-content/uploads/2021/06/1-%EB%9D%BC%EC%BC%93%EC%86%8C%EB%85%84%EB%8B%A8.jpg',
      area: '배민구',
      moimLoction: '선우체육관',
      moimName: '텐션',
      moimMemberCount: 30,
    },
    {
      id: 7,
      image:
        'https://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.jpg',
      area: '몰라구',
      moimLoction: '도레미체육관',
      moimName: '세븐틴',
      moimMemberCount: 77,
    },
    {
      id: 8,
      image: 'https://cdn.jjan.kr/news/photo/202108/2114212_316214_579.jpg',
      area: '배모구',
      moimLoction: '미정',
      moimName: '배모',
      moimMemberCount: 8,
    },
    {
      id: 9,
      image:
        'https://image.shutterstock.com/image-photo/cream-white-badminton-shuttlecock-neon-260nw-1427088038.jpg',
      area: '아이구',
      moimLoction: '미정',
      moimName: '아배',
      moimMemberCount: 10,
    },
    {
      id: 10,
      image: 'http://goldbronze2.hgodo.com/tagmoa/dm/0311/sports/13283618.jpg',
      area: '금천구',
      moimLoction: '모션체육관',
      moimName: '구라구라배',
      moimMemberCount: 10,
    },
    {
      id: 11,
      image:
        'https://image.shutterstock.com/image-photo/cream-white-badminton-shuttlecock-neon-260nw-1427088038.jpg',
      area: '노원구',
      moimLoction: '독산체육관',
      moimName: '포텐셜11',
      moimMemberCount: 80,
    },
    {
      id: 12,
      image:
        'https://mblogthumb-phinf.pstatic.net/MjAxNzA0MDJfMTc3/MDAxNDkxMTE1MzMwNDE0.fFSta6n3NHFuh4GLiFwa3h2SCOARn_RrKMx0jBjjgRcg.eTfmSKIo9xs-qLkWaeS7QRKiG03LLXk1FBAefUEWj90g.JPEG.hello286668/%EB%B0%B0%EB%93%9C%EB%AF%BC%ED%84%B4%EC%9D%B4%EB%AF%B8%EC%A7%80_1.jpg?type=w800',
      area: '양천구',
      moimLoction: '미성체육관 매표소 앞',
      moimName: '열심히 하자!',
      moimMemberCount: 40,
    },
    {
      id: 13,
      image:
        'https://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.jpg',
      area: '구구구',
      moimLoction: '오오',
      moimName: '모여라 배배',
      moimMemberCount: 92,
    },
    {
      id: 14,
      image:
        'https://m.themagazine.co.kr/web/product/extra/big/202106/5ff96eb073d58c166cc64d86a264b777.jpg',
      area: '헤이구',
      moimLoction: '몰라요',
      moimName: '배배',
      moimMemberCount: 68,
    },
    {
      id: 15,
      image:
        'https://previews.123rf.com/images/redlinevector/redlinevector1703/redlinevector170311550/74527882-%EB%B0%B0%EB%93%9C%EB%AF%BC%ED%84%B4-%EC%95%84%EC%9D%B4%EC%BD%98.jpg',
      area: '에이치구',
      moimLoction: '미성체육관 주차장',
      moimName: '안안경 안과',
      moimMemberCount: 25,
    },
    {
      id: 16,
      image: 'https://www.emojiall.com/en/header-svg/%F0%9F%8F%B8.png',
      area: '관악구',
      moimLoction: '현재 문의중',
      moimName: '액션민턴',
      moimMemberCount: 87,
    },
    {
      id: 17,
      image: 'http://www.hidomin.com/news/photo/202108/460083_230131_0927.jpg',
      area: '안녕하세요',
      moimLoction: '허이구',
      moimName: '허이배',
      moimMemberCount: 57,
    },
    {
      id: 18,
      image:
        'https://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.jpg',
      area: '감사해요',
      moimLoction: '열열구',
      moimName: '잘있어요',
      moimMemberCount: 79,
    },
    {
      id: 19,
      image:
        'https://mblogthumb-phinf.pstatic.net/MjAxNzA0MDJfMTc3/MDAxNDkxMTE1MzMwNDE0.fFSta6n3NHFuh4GLiFwa3h2SCOARn_RrKMx0jBjjgRcg.eTfmSKIo9xs-qLkWaeS7QRKiG03LLXk1FBAefUEWj90g.JPEG.hello286668/%EB%B0%B0%EB%93%9C%EB%AF%BC%ED%84%B4%EC%9D%B4%EB%AF%B8%EC%A7%80_1.jpg?type=w800',
      area: '건구구',
      moimLoction: '건우 체육관',
      moimName: '건국 우유',
      moimMemberCount: 36,
    },
    {
      id: 20,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLNTSSsUVAtSu4CQs6zq88pCmZZvS1sqWcbQ&usqp=CAU',
      area: '사포구',
      moimLoction: '신지 체육관',
      moimName: '수지 맞자',
      moimMemberCount: 4,
    },

    {
      id: 21,
      image:
        'https://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.jpg',
      area: '일일구',
      moimLoction: '일체육관',
      moimName: '포텐셜 2',
      moimMemberCount: 120,
    },
    {
      id: 22,
      image:
        'https://mblogthumb-phinf.pstatic.net/MjAxNzA0MDJfMTc3/MDAxNDkxMTE1MzMwNDE0.fFSta6n3NHFuh4GLiFwa3h2SCOARn_RrKMx0jBjjgRcg.eTfmSKIo9xs-qLkWaeS7QRKiG03LLXk1FBAefUEWj90g.JPEG.hello286668/%EB%B0%B0%EB%93%9C%EB%AF%BC%ED%84%B4%EC%9D%B4%EB%AF%B8%EC%A7%80_1.jpg?type=w800',
      area: '기억구',
      moimLoction: '구구체육관',
      moimName: '나무모임 2',
      moimMemberCount: 98,
    },
    {
      id: 23,
      image:
        'https://newsimg.hankookilbo.com/cms/articlerelease/2021/07/31/8f8a6f47-ad4a-468e-9fd1-cb4f89a03ddd.jpg',
      area: '노원구',
      moimLoction: '미성체육관',
      moimName: '배라',
      moimMemberCount: 12,
    },
    {
      id: 24,
      image:
        'https://img.etoday.co.kr/pto_db/2021/07/600/20210729144254_1649771_1199_799.jpg',
      area: '성동구',
      moimLoction: '일체육관',
      moimName: '이슬콕콕',
      moimMemberCount: 97,
    },
    {
      id: 25,
      image:
        'https://mblogthumb-phinf.pstatic.net/MjAxNzA0MDJfMTc3/MDAxNDkxMTE1MzMwNDE0.fFSta6n3NHFuh4GLiFwa3h2SCOARn_RrKMx0jBjjgRcg.eTfmSKIo9xs-qLkWaeS7QRKiG03LLXk1FBAefUEWj90g.JPEG.hello286668/%EB%B0%B0%EB%93%9C%EB%AF%BC%ED%84%B4%EC%9D%B4%EB%AF%B8%EC%A7%80_1.jpg?type=w800',
      area: '강북구',
      moimLoction: '삼삼체육관',
      moimName: '안녕하세요 2',
      moimMemberCount: 100,
    },
    {
      id: 26,
      image:
        'https://www.sciencetimes.co.kr/wp-content/uploads/2021/06/1-%EB%9D%BC%EC%BC%93%EC%86%8C%EB%85%84%EB%8B%A8.jpg',
      area: '배민구',
      moimLoction: '선우체육관',
      moimName: '텐션',
      moimMemberCount: 30,
    },
    {
      id: 27,
      image:
        'https://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.jpg',
      area: '몰라구',
      moimLoction: '도레미체육관',
      moimName: '세븐틴 2',
      moimMemberCount: 77,
    },
    {
      id: 28,
      image: 'https://cdn.jjan.kr/news/photo/202108/2114212_316214_579.jpg',
      area: '배모구',
      moimLoction: '미정',
      moimName: '배모',
      moimMemberCount: 8,
    },
    {
      id: 29,
      image:
        'https://image.shutterstock.com/image-photo/cream-white-badminton-shuttlecock-neon-260nw-1427088038.jpg',
      area: '아이구',
      moimLoction: '미정',
      moimName: '아배',
      moimMemberCount: 10,
    },
    {
      id: 30,
      image: 'http://goldbronze2.hgodo.com/tagmoa/dm/0311/sports/13283618.jpg',
      area: '금천구',
      moimLoction: '모션체육관',
      moimName: '구라구라배',
      moimMemberCount: 10,
    },
    {
      id: 31,
      image:
        'https://image.shutterstock.com/image-photo/cream-white-badminton-shuttlecock-neon-260nw-1427088038.jpg',
      area: '노원구',
      moimLoction: '독산체육관',
      moimName: '포텐셜11 2',
      moimMemberCount: 80,
    },
    {
      id: 32,
      image:
        'https://mblogthumb-phinf.pstatic.net/MjAxNzA0MDJfMTc3/MDAxNDkxMTE1MzMwNDE0.fFSta6n3NHFuh4GLiFwa3h2SCOARn_RrKMx0jBjjgRcg.eTfmSKIo9xs-qLkWaeS7QRKiG03LLXk1FBAefUEWj90g.JPEG.hello286668/%EB%B0%B0%EB%93%9C%EB%AF%BC%ED%84%B4%EC%9D%B4%EB%AF%B8%EC%A7%80_1.jpg?type=w800',
      area: '양천구',
      moimLoction: '미성체육관 매표소 앞',
      moimName: '열심히 하자!',
      moimMemberCount: 40,
    },
    {
      id: 33,
      image:
        'https://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.jpg',
      area: '구구구',
      moimLoction: '오오',
      moimName: '모여라 배배',
      moimMemberCount: 92,
    },
    {
      id: 34,
      image:
        'https://m.themagazine.co.kr/web/product/extra/big/202106/5ff96eb073d58c166cc64d86a264b777.jpg',
      area: '헤이구',
      moimLoction: '몰라요',
      moimName: '배배',
      moimMemberCount: 68,
    },
    {
      id: 35,
      image:
        'https://previews.123rf.com/images/redlinevector/redlinevector1703/redlinevector170311550/74527882-%EB%B0%B0%EB%93%9C%EB%AF%BC%ED%84%B4-%EC%95%84%EC%9D%B4%EC%BD%98.jpg',
      area: '에이치구',
      moimLoction: '미성체육관 주차장',
      moimName: '안안경 안과 2',
      moimMemberCount: 25,
    },
    {
      id: 36,
      image: 'https://www.emojiall.com/en/header-svg/%F0%9F%8F%B8.png',
      area: '관악구',
      moimLoction: '현재 문의중',
      moimName: '액션민턴',
      moimMemberCount: 87,
    },
    {
      id: 37,
      image: 'http://www.hidomin.com/news/photo/202108/460083_230131_0927.jpg',
      area: '안녕하세요',
      moimLoction: '허이구',
      moimName: '허이배',
      moimMemberCount: 57,
    },
    {
      id: 38,
      image:
        'https://img.khan.co.kr/news/2019/11/29/l_2019112901003607500286631.jpg',
      area: '감사해요',
      moimLoction: '열열구',
      moimName: '잘있어요',
      moimMemberCount: 79,
    },
    {
      id: 39,
      image:
        'https://mblogthumb-phinf.pstatic.net/MjAxNzA0MDJfMTc3/MDAxNDkxMTE1MzMwNDE0.fFSta6n3NHFuh4GLiFwa3h2SCOARn_RrKMx0jBjjgRcg.eTfmSKIo9xs-qLkWaeS7QRKiG03LLXk1FBAefUEWj90g.JPEG.hello286668/%EB%B0%B0%EB%93%9C%EB%AF%BC%ED%84%B4%EC%9D%B4%EB%AF%B8%EC%A7%80_1.jpg?type=w800',
      area: '건구구',
      moimLoction: '건우 체육관',
      moimName: '건국 우유',
      moimMemberCount: 36,
    },
    {
      id: 40,
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLNTSSsUVAtSu4CQs6zq88pCmZZvS1sqWcbQ&usqp=CAU',
      area: '사포구',
      moimLoction: '신지 체육관',
      moimName: '수지 맞자 2',
      moimMemberCount: 4,
    },
  ],
  categories: [
    { id: 1, name: '자유글' },
    { id: 2, name: '정모후기' },
    { id: 3, name: '가입인사' },
    { id: 4, name: '공지사항' },
  ],
  requires: [
    { boardId: 1, title: '회원정리 공지' },
    { boardId: 2, title: '회비관련 중요공지사항' },
    { boardId: 3, title: '가입자 자기소개 양식' },
  ],
};

mocks.moims.forEach((moim, cursor) => {
  // 모임 상세 생성
  moim.moimDetail = chance.paragraph({
    sentences: chance.integer({ min: 1, max: 10 }),
  });

  // 정모 목록 생성
  moim.meetings = [];
  for (let i = 0; i < +chance.integer({ min: 0, max: 100 }); i++) {
    moim.meetings.push({
      name: `${chance.street()} 정모`,
      meeting: format(
        new Date(chance.timestamp() + 1615200000000),
        'yyyy-MM-dd HH:mm:ss',
      ),
      place: chance.address(),
      price: chance.dollar({ max: 200 }),
      limitMemberCount: chance.integer({
        min: moim.moimMemberCount,
        max: moim.moimMemberCount + chance.integer({ min: 0, max: 10 }),
      }),
      attendMemberCount:
        moim.moimMemberCount === 0
          ? 0
          : chance.integer({
              min: 1,
              max: moim.moimMemberCount,
            }),
    });
  }

  // 모임 구성원 목록 생성
  moim.members = [];
  for (let i = 0; i < moim.moimMemberCount; i++) {
    moim.members.push({
      image: `https://picsum.photos/seed/${
        cursor * mocks.moims.length + i
      }/600/800`,
      name: chance.name(),
      greeting: `${chance.sentence()}`,
      role: '운영진',
    });
  }

  // 모임장 지정
  moim.members[
    chance.integer({
      min: 0,
      max: moim.members.length - 1,
    })
  ].role = '모임장';

  // 게시글 목록 생성
  moim.boards = [];
  for (let i = 0; i < +chance.integer({ min: 0, max: 100 }); i++) {
    const { image: profileImage, name: memberName } =
      moim.members[
        chance.integer({
          min: 0,
          max: moim.members.length - 1,
        })
      ];
    const createAt = new Date(chance.timestamp() + 1615200000000);
    const likeCount = chance.integer({ min: 0, max: moim.members.length });
    const userIds = mocks.users.map((user) => user.userId);
    moim.boards.push({
      id: boardId,
      profileImage,
      memberName,
      title: chance.sentence(),
      createDate: format(createAt, 'yyyy-MM-dd HH:mm:ss'),
      updateDate: format(
        addDays(createAt, chance.integer({ min: 0, max: 30 })),
        'yyyy-MM-dd HH:mm:ss',
      ),
      boardImage:
        chance.integer({ min: 1, max: 3 }) % 3 === 0
          ? `https://picsum.photos/seed/${boardId}/1200/800`
          : null,
      likeCount,
      boardCategory:
        mocks.categories[
          chance.integer({ min: 0, max: mocks.categories.length - 1 })
        ],
      content: chance.paragraph({
        sentences: chance.integer({ min: 2, max: 20 }),
      }),
      commentCount: chance.integer({ min: 0, max: 100 }),
      likeMemberIds:
        likeCount >= userIds.length &&
        chance.integer({ min: 0, max: 10 }) % 10 === 0
          ? userIds.slice(chance.integer({ min: 0, max: userIds.length - 1 }))
          : [],
    });
    boardId = boardId + chance.integer({ min: 1, max: 5 });
  }
});

@Injectable()
export class MocksService {
  private readonly users = mocks.users;
  private readonly moims = mocks.moims;
  private readonly categories = mocks.categories;
  private readonly requires = mocks.requires;

  async getUsers() {
    return this.users;
  }

  async getMoims() {
    return this.moims;
  }

  async getCategories() {
    return this.categories;
  }

  async getRequires() {
    return this.requires;
  }
}
