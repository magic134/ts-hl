

DROP TABLE IF EXISTS sync_user_leaderboard;
CREATE TABLE sync_user_leaderboard (
  type varchar(16) NOT NULL default '',
  rank int(4) NOT NULL default 0,
  name varchar(16) default NULL,
  look int(11) default 0,
  level int(11) default 0,
  metempsychosis int(11) default 0,
  toutai int(11) default 0,
  degree_lev int(11) default 0,
  money int(11) default 0,
  hongli int(11) default 0,
  deed int(11) default 0,
  total_money int(11) default 0,
  snapshot_time int(10) NOT NULL default 0,
  PRIMARY KEY (type, rank)
) 