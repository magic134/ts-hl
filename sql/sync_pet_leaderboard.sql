

DROP TABLE IF EXISTS sync_pet_leaderboard;
CREATE TABLE sync_pet_leaderboard (
  type varchar(16) NOT NULL default '',
  rank int(4) NOT NULL default 0,
  owner_name varchar(16) default NULL,
  pet_name varchar(32) default NULL,
  class int(11) default 0,
  className varchar(32) default NULL,
  level int(11) default 0,
  grow decimal(10,4) default 0.0000,
  generation int(11) default 0,
  snapshot_time int(10) NOT NULL default 0,
  PRIMARY KEY (type, rank)
) 