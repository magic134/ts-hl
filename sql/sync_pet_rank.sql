

DROP TABLE IF EXISTS sync_pet_rank;
CREATE TABLE sync_pet_rank (
  filter_catena varchar(8) NOT NULL default '',
  filter_is_evolution varchar(8) NOT NULL default '',
  rank int(4) NOT NULL default 0,
  pet_id int(11) NOT NULL default 0,
  owner_name varchar(16) default NULL,
  pet_origin_name varchar(32) default NULL,
  pet_name varchar(32) default NULL,
  prop varchar(8) default NULL,
  grow_rate varchar(16) default NULL,
  grow_point int(11) default 0,
  level int(11) default 0,
  attack int(11) default 0,
  defence int(11) default 0,
  dexterity int(11) default 0,
  life int(11) default 0,
  generation int(11) default 0,
  medal_attack int(11) default 0,
  medal_defence int(11) default 0,
  medal_dexterity int(11) default 0,
  treasure_id int(11) default 0,
  pet_treasure varchar(32) default NULL,
  snapshot_time int(10) NOT NULL default 0,
  PRIMARY KEY (filter_catena, filter_is_evolution, rank)
) 