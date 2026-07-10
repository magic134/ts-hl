
DROP TABLE IF EXISTS sync_user_rank;
CREATE TABLE sync_user_rank (
  rank_type varchar(8) NOT NULL default '',
  rank_type_name varchar(32) default NULL,
  rank int(4) NOT NULL default 0,
  user_id int(11) NOT NULL default 0,
  name varchar(16) default NULL,
  level int(11) default 0,
  metempsychosis int(11) default 0,
  additional_point int(11) default 0,
  degree_lev int(11) default 0,
  money int(11) default 0,
  deed int(11) default 0,
  exp_medicine int(11) default 0,
  exp_creative int(11) default 0,
  repute int(11) default 0,
  exp_smith int(11) default 0,
  exp_steal int(11) default 0,
  love int(11) default 0,
  hongli int(11) default 0,
  toutaishu int(11) default 0,
  qq varchar(32) default NULL,
  snapshot_time int(10) NOT NULL default 0,
  PRIMARY KEY (rank_type, rank)
) 