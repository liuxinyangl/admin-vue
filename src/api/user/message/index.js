/**
 * 分页查询通知
 */
export async function pageNotices() {
  return {
    count: 10,
    list: [
      {
        id: 21,
        title: '新版本发布，欢迎体验',
        time: '2020-07-24 11:35',
        status: 0
      },
    ]
  };
}

/**
 * 分页查询私信
 */
export async function pageLetters() {
  return {
    count: 10,
    list: [
      {
        id: 11,
        title: '一条私信',
        time: '2020-07-24 11:35',
        status: 0
      },
    ]
  };
}


/**
 * 查询未读数量
 */
export async function getUnReadNum() {
  return {
    notice: 2,
    letter: 3,
  };
}
