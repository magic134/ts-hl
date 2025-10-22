/*
 Navicat Premium Data Transfer

 Source Server         : hello
 Source Server Type    : MySQL
 Source Server Version : 32336
 Source Host           : 192.168.171.128:3306
 Source Schema         : hlyx

 Target Server Type    : MySQL
 Target Server Version : 32336
 File Encoding         : 65001

 Date: 21/10/2025 18:59:12
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_syndicate
-- ----------------------------
DROP TABLE IF EXISTS `yx_syndicate`;
CREATE TABLE `yx_syndicate`  (
  `id` int(4) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` char(15) NOT NULL DEFAULT '未命名',
  `title` char(127) NOT NULL DEFAULT '未命名',
  `tenet` char(127) NULL DEFAULT '',
  `level` int(4) NOT NULL DEFAULT 1,
  `leader_title` char(15) NOT NULL DEFAULT '帮主',
  `member_title` char(15) NOT NULL DEFAULT '弟子',
  `server_name` char(15) NOT NULL DEFAULT 'test',
  `race_type` int(4) NOT NULL DEFAULT 0,
  `moral_type` int(4) NOT NULL DEFAULT 0,
  `money` int(4) NOT NULL DEFAULT 300000,
  `mapenter_id` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `mapenter_x` int(4) NOT NULL DEFAULT 0,
  `mapenter_y` int(4) NOT NULL DEFAULT 0,
  `mapenter_npc` int(4) NOT NULL DEFAULT 0,
  `map_type` int(4) NOT NULL DEFAULT 0,
  `map_id` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `ally1` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `ally2` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `ally3` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `ally4` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `ally5` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `enemy1` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `enemy2` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `enemy3` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `enemy4` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `enemy5` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `original_leader_name` char(15) NULL DEFAULT '',
  `del_flag` int(4) NOT NULL DEFAULT 0,
  `member_count` int(4) UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name`(`name`),
  INDEX `order_money`(`money`),
  INDEX `order_member_count`(`member_count`)
) ENGINE = MyISAM AUTO_INCREMENT = 1 ROW_FORMAT = Fixed;

SET FOREIGN_KEY_CHECKS = 1;
