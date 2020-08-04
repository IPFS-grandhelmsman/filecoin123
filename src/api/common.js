import ajax from '@/utils/ajax'
// import { getToken } from '@/utils/auth'

// 登录
export function login(account, password) {
  // const params = {
  //   account: account,
  //   password: password
  // }
  // return ajax.post('user/login', params)

  const params = {
    responseType: 4,
    account: account,
    password: password
  }

  return ajax.post('', params)
}

// 注册
export function register(email, validateCode, password, repassword) {
  const params = {
    responseType: 3,
    email: email,
    emailCode: validateCode,
    password: password,
    repassword: repassword
  }

  return ajax.post('', params)
}

// 获取用户信息
export function getUserInfo(params) {
  // return ajax.post('user/info', params)

  params = {
    responseType: 5
  }

  return ajax.post('', params)
}

// 退出登录
export function logout() {
  // return ajax.post('user/logout')
}

// 数据结构
// {
//   "res": {
//       "code": 3,
//       "msg": "success"
//   },
//   "data": {

//   }
// }

// 获取节点地图数据
export function fetchPeerMap() {
  // "peer_point": [
  //   {
  //       "location_cn": "亚洲 中国 江苏省 常州市",
  //       "location_en": "Asia China Jiangsu Changzhou",
  //       "peers": [
  //           {
  //               "peer_id": "12D3KooWPncYoLRtuKmS7exGNAd9AmmsM3XeeW6f1QHA3zsYYHwB",
  //               "ip": "218.93.31.106"
  //           }
  //       ],
  //       "longitude": 119.954,
  //       "latitude": 31.7736
  //   },

  //   {
  //       "location_cn": "亚洲 中国 山东省 青岛市",
  //       "location_en": "Asia China Shandong Qingdao",
  //       "peers": [
  //           {
  //               "peer_id": "12D3KooWPk6KKUYvZw7YMU9p9U96HLe93ZiwzN4KnXw8EgFcsmGa",
  //               "ip": "111.17.220.229"
  //           },
  //           {
  //               "peer_id": "12D3KooWCcBBiUCcw5wq9z3bmLoRAEH98LS24aFk9jfxMZnATDG4",
  //               "ip": "111.17.220.229"
  //           }
  //       ],
  //       "longitude": 120.3694,
  //       "latitude": 36.066
  //   },
  // ]
  return ajax.postJson('peer/PeerMap')
}

// 获取首页统计数据
export function fetchBaseInformation() {
  // "tipset_height": "1408",//区块高度
  // ?? 全网算力
  // ?? 全网矿工数
  // "outstanding": "1.250",//全网可用 && 流通中
  // "pledge_collateral": "0.000",//抵押代币
  // "head_update": "42",//最新出块时间
  // 平均出块时间：见下方
  // "block_reward": 5.4918373158284846,//每选票奖励
  // "avg_gas_price": 2.763,//平均gas
  // "avg_messages_tipset": 74.705,//平均消息数量
  // "avg_message_size": 236.261,//平均消息大小
  // "avg_block_tipset": "2.570"//平均每高度区块数量
  return ajax.post('Grafana/minerData', { method: 'BaseInformation' })
  // return ajax.postJson('BaseInformation')
}

// 获取出块时间图表信息
export function fetchBlockTimeData(startTime = parseInt(new Date().getTime() / 1000) - 24 * 60 * 60, endTime = parseInt(new Date().getTime() / 1000)) {
// "data": [
//     {
//         "time": "1595991600", //时间戳
//         "block_time": "25"//出块时间
//     },
//     {
//         "time": "1595995200",
//         "block_time": "25"
//     },
// ],
// "avg_blocktime": "25", //平均出块时间
// "min": "25", //最小出块时间
// "max": "25"//最大出块时间
  // return ajax.postJson('BlocktimeGraphical', { start_time: startTime, end_time: endTime })
  return ajax.post('Grafana/minerData', { method: 'BlocktimeGraphical', start_time: startTime, end_time: endTime })
}

// 获取算力统计
export function fetchTotalPower(time = parseInt(new Date().getTime() / 1000)) {
//   "data": [
//     {
//         "time": "1596106785",
//         "power": "619742305976320",
//         "quality_adjusted_power": "1332225840775168"
//     },
//     {
//         "time": "1596110385",
//         "power": "646328690409472",
//         "quality_adjusted_power": "1358812225208320"
//     }
//  ],
//  "storage_capacity": "646328690409472"
  // return ajax.postJson('/TotalPowerGraphical', { time: time })
  return ajax.post('Grafana/minerData', { method: 'TotalPowerGraphical', time: time })
}

// 获取最新区块列表
export function fetchLatestBlock(count = 20) {
  // "block_header": [
  //   {
  //     "block_header": {
  //         "miner": "t08614",
  //         "tickets": "tiIzOs3RaEi/X2/phX1/ZfhCVp2MiV6WN4yrRmZB4FToRG+cJ7sL15guCqhY3yiKFT0BhQFPHnumbFfGllMA2yJ3WxIS+kEe/y4svCn9NHWFeOobg9nLscqKLWlcYq7a",
  //         "e_post_proof_len": 1,
  //         "parents": [],
  //         "parent_weight": "91180973",
  //         "height": "4948",
  //         "parent_state_root": "bafy2bzacedve5aat5vcuqrx5werwjqe5ip5ezq4fhufm4hqaa4hd6aeobgayq",
  //         "parent_message_receipts": "bafy2bzacediezoe7odmuua6ee2ihz766emj3fh5jrrth2ksxonjxxy7os3il6",
  //         "messages": "bafy2bzaceczzliklr2fzmik7fu46r7bycpnx7fhvac3uhxn4ikwekwf4akcpe",
  //         "bls_aggregate": {},
  //         "timestamp": "1596113260",
  //         "block_sig": {}
  //     },
  //     "cid": "bafy2bzacebfceoa5fex3c667qheslz6p75filsw6wnrnn4wcawnxal5h5mmgg",
  //     "size": "933",
  //     "msg_cids": [
  //         "bafy2bzaceay6qxpk7pgzdz52fgszqknb6bfdql5fusxzmwkc6ugwhrgqiexrw",
  //         "bafy2bzacedxykaulaxr4mnuf5wpnffepgaanvfoorjtyv6adjcblaoajf5mim",
  //         "bafy2bzacecfhqedwktkgljzybnqeggt7mtnoml3zi62dd7pqjdg5zrty4gadw",
  //         "bafy2bzaceaadzxfdar3r4k2jlwau4pl2u7zbhbgpc4z4eheu4migqzrydqdhw",
  //         "bafy2bzacebxdkwawf3biwfrztz7vsmufxu5vhfbxgafanizynyyisgk6c6lrm",
  //         "bafy2bzacecrktlobbczzlcweremeujpotycisvibpts2spemiuwfpprhs6koo",
  //         "bafy2bzacedxm2yuz45ykxds636oaokkekdsztog2utz4zap3e54tecpo5z2y6",
  //         "bafy2bzaceabmixzbk2ukrwxdytoavimb2jj53twbt5gznvkqavfshhuwc6oo4",
  //         "bafy2bzaceaar4kzd2vshzduytsy3x7g7a7dklqlwhdmz54njstrqz5ezl4v7i",
  //         "bafy2bzaceavn35cgcgnbkdcavlthaubbshpev3bvqchpau3c2o7riqolkxwbc",
  //         "bafy2bzaceanz5v3cn2yr4maxlvwoustidb3wyapbz2nnlou3dey2t27dkmx2u",
  //         "bafy2bzacebbeif5l4eosijeh3tls7wephctxyobtp5n6id6vl7aa63hn6fu3i",
  //         "bafy2bzacecsexke3b6vilqkylzr3kyrfcdm2dgde5egxbdltw3zt22bjfg73s",
  //         "bafy2bzacedp2zxt5zwmejb6hyzqdteogjmgwuvlevyxcqwjgxu6xk26zjm6js",
  //         "bafy2bzaceb5xz5nsybm5hzfbgpyuos5xqeutfe56urw4wre6s6vm3koxlgi5k",
  //         "bafy2bzacecyq3z6zyol4n67kn5x6u4ufiovl22k3db4boi2y6iagb4dot6eqk",
  //         "bafy2bzacebcljx4hwb37tgsaeep63n2nq2xswkjqvnyli3njht25q4zmugjtk",
  //         "bafy2bzacedoujtrwx6xp4prfqen7gx5qz3aqsj4pprxu3qmspy7k7o236glfs",
  //         "bafy2bzacebqbaqqmcrof6dqdog4ml72dtajwxjlmjbb4o4plheqvkax2llcdc",
  //         "bafy2bzaceblpkzd65t5ystbuux5uzmx2iwjta7zxfp2mhk6ab24xba66tucec",
  //         "bafy2bzaceazpnwaaenhd7suth3a6ry4lt3vjpmnek6wyedncfoevtz4a7hwa6",
  //         "bafy2bzacec5qwpw7zlasx6rndjfwna5vbxslhsisqtkxe5ghhixj6gxbf6jki",
  //         "bafy2bzacedl7fwosd3zbfcgboxzaflzabublshp5gfm4cmtdvmon4ecolcs4i",
  //         "bafy2bzacea35ijy6tv2ur7dt7nxtdmgeqhyea3dkh73gqfkz7u6gtnxjvvjl2",
  //         "bafy2bzacec6iajfeocl7pr76nfgiebn36imkel3yko2vad7gk7cxjgdwq6ouq",
  //         "bafy2bzacedd3p2pp6qv2oc3srb4bkgjwj26f5dmuoj56sfeseui66jyuczy4c",
  //         "bafy2bzacebx5edqgyegvxjx2osyyf6t7mlry6pbm3ar37ms3itvkei52b3ryg",
  //         "bafy2bzaceam6dit42amx4heuvu6fwbmvvvmgmjaep47jijexh3wcddkhstdnu",
  //         "bafy2bzacebtirny4ggvgg3fabz2ivaw7tmwxays7675bz462qhjwossnxkqdw",
  //         "bafy2bzaceaqh3uiqfkhp4ngamaldz66upc7y5xkilss5q7pzwelspk2ilovys",
  //         "bafy2bzaceaq4sahpkhjb5wihrwhr3f2tynchiqfaf5uj3kvi5vai2hoaomogo",
  //         "bafy2bzacebl6tujsiz33uqwjdql4lc2g2ircwbdzu32c2i77zxo7qpx55pupg",
  //         "bafy2bzaced35xaqbhekdunpczt3kfdbgjobeutc2gy6ay4j4herni6nrawe76",
  //         "bafy2bzacedmkxxkkw5ylioiadfw4hikuprnff7jayoz4yhkc4s45g3lmrgqde",
  //         "bafy2bzacedjhy3yfkiywhals6rzw4fgz7ttiahaa3zbi67ntghefycwoszzvo",
  //         "bafy2bzacecbved6puxfq3z6leyzmtt24fnimcxykktmkj3kliricms5bdvmry",
  //         "bafy2bzacecvd7prcnjm654yqggak4n5hxyu3gc7p7jnic4dnu34rpksccjb5u",
  //         "bafy2bzaceagx2k5y6rowmfykxto6m3y7prat55f63czup3fgx3tl3pynrfkkq",
  //         "bafy2bzacecytlhznhrkxlblob5vguoxrj6hmk4wv6jbnywvke2xjfndyuffuk",
  //         "bafy2bzaceayd3qvedjwesbmx7266ra5n6tylxnbjn3aiihojxzgfq6nudjqcs",
  //         "bafy2bzaceanns5rzmnfy4rpbwwpyjvoq522mgz65cmiqba47tohy7lm573fty",
  //         "bafy2bzacedbjq7sq5i6mmwnfpl6ysczyaqr3kyuk5rbzo5pws3mitml23hv72"
  //     ],
  //     "reward": "5.49620466"
  //   },
  // ]
  // return ajax.postJson('LatestBlock', { num: count })
  return ajax.post('Grafana/LatestBlock', { num: count })
}

// 获取最新消息列表
export function fetchLatestMsg(count = 10) {
//   "msg": [
//     {
//         "msg": {
//             "to": "t05",
//             "from": "t3slxe7vczkvljsuf5anfx6i3zuqtitcc6dussyxbkf7twqsazsmhidzveffbjvrtrcr53c32izhcfyfpxllma",
//             "nonce": "2866",
//             "value": "0",
//             "gasprice": "0.000000000000000001",
//             "gaslimit": "370979218",
//             "method": "4",
//             "params": "gYGCi9gqWCgAAYHiA5IgIID+iks8zL4WWUcK0CHxz82aWI4NrUexObofspOoEQ81GRAA9FgxA7NC87xSwMYTCvFVrd0jIKLWU4aWybB0Of6O5mRbiwpUGPTNTJN7c0r4Z2rpxRz0t0QA1LYBYBlGLRoACdSXRgALDzh7AEMAD+BAWGECif+lsGj8xygAtvGxvCUV8WXXwzMT1R+ITgumXbNWCj9VQV9Hg80oswVeEh1deqXlAgy2YCscqmL56fpvJGH3atgNfTrg3FkjILlW+kXbmpB4S5LXgpmbKhdhV8PH9RGl"
//         },
//         "cid": "bafy2bzaceaz3x2zw25q2ejpu5f2vvnnupu2wkndhboyerixjsuuji7dhh5yym",
//         "sign_cid": "",
//         "size": "299",
//         "msgcreate": "1596182385",
//         "height": "7713",
//         "block_cids": [
//             "bafy2bzacedeckv6eyfanyzdb2gczyhpwzb6dvp2wreelawaappmn33uxnmv4y",
//             "bafy2bzaceawfsnc57trblw3spvpwjxr7fopgtqiwyjcokw6svrnt4kg2x6yxu",
//             "bafy2bzacebmnv477exuxu74hbdjf3p57dgfns5ael6vndm4ha2c4cgyituena",
//             "bafy2bzaceag57vivfusp5yp5ppnuupnsqxhsihmf7quwi5v3oct7y3mn4i6oa",
//             "bafy2bzacecisevdodpwmx7o4viisybq343rufbpmmalwj6zi23q3gz4zrgrhi"
//         ],
//         "exit_code": "0",
//         "return": "��?>",
//         "gas_used": "248229709",
//         "method_name": "ChangePeerID"
//     },
//     {
//         "msg": {
//             "to": "t02276",
//             "from": "t3xh6j5tpaldjhjb7wrcef5cy5rfegdeqitglroh3i4quszjq6kart7q4g65nwuss63ac6enspoxm5brcyuzca",
//             "nonce": "261",
//             "value": "8.278978215370450749",
//             "gasprice": "0.000000000000000001",
//             "gaslimit": "211225470",
//             "method": "7",
//             "params": "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"
//         },
//         "cid": "bafy2bzaceaccwr6uxv5hujfzn3cqic43vpb5hwadorssfur2o6xrp2zpy75ek",
//         "sign_cid": "",
//         "size": "2008",
//         "msgcreate": "1596182385",
//         "height": "7713",
//         "block_cids": [
//             "bafy2bzacedeckv6eyfanyzdb2gczyhpwzb6dvp2wreelawaappmn33uxnmv4y",
//             "bafy2bzaceawfsnc57trblw3spvpwjxr7fopgtqiwyjcokw6svrnt4kg2x6yxu",
//             "bafy2bzacebmnv477exuxu74hbdjf3p57dgfns5ael6vndm4ha2c4cgyituena",
//             "bafy2bzaceag57vivfusp5yp5ppnuupnsqxhsihmf7quwi5v3oct7y3mn4i6oa",
//             "bafy2bzacecisevdodpwmx7o4viisybq343rufbpmmalwj6zi23q3gz4zrgrhi"
//         ],
//         "exit_code": "0",
//         "return": "",
//         "gas_used": "140859980",
//         "method_name": "ProveCommitSector"
//     },
//  ]
  // return ajax.postJson('LatestMsg', { num: count })
  return ajax.post('Grafana/LatestMsg', { num: count })
}

// 获取最新消息列表
export function fetchBlocksWon() {
  return ajax.post('Grafana/minerData', { method: 'GetBlockWonList' })
}

// 获取排行榜数据
export function fetchGrafanaRank(page = 1, prePage = 20) {
  return ajax.post('Grafana/getFilsMinerRanking', { page: page, pre_page: prePage })
}

// 获取grafana 相关的数据
export function fetchGrafanaData(url = '') {
  return ajax.post('Grafana/' + url)
}

// 获取区块列表
export function fetchBlockList(end_height = 0, count = 15) {
  return ajax.post('Grafana/getBlockList', { end_height: end_height, count: count })
}

// 获取区块详情
export function fetchBlockMessages(method = '', begindex = 0, count = 25, block_cid = '') {
  var param = { method: method, begindex: begindex, count: count }
  if (block_cid) {
    param.block_cid = block_cid
  }
  return ajax.post('Grafana/getBlockMessages', param)
}

// 获取账户列表
export function fetchAccountList(begindex = 0, count = 25) {
  return ajax.post('Grafana/getAccountList', { begindex: begindex, count: count })
}
