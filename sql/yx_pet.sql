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

 Date: 21/10/2025 18:57:33
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_pet
-- ----------------------------
DROP TABLE IF EXISTS `yx_pet`;
CREATE TABLE `yx_pet`  (
  `name` char(16) NULL DEFAULT '0',
  `look` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `attack` double(6, 4) UNSIGNED ZEROFILL NULL DEFAULT 0.0000,
  `defence` double(6, 4) UNSIGNED ZEROFILL NULL DEFAULT 0.0000,
  `dexterity` double(6, 4) UNSIGNED ZEROFILL NULL DEFAULT 0.0000,
  `base_attack` double(6, 4) UNSIGNED ZEROFILL NULL DEFAULT 0.0000,
  `base_defence` double(6, 4) UNSIGNED ZEROFILL NULL DEFAULT 0.0000,
  `base_dexterity` double(6, 4) UNSIGNED ZEROFILL NULL DEFAULT 0.0000,
  `level` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `exp` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `life` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `grow_rate` double(6, 4) UNSIGNED ZEROFILL NULL DEFAULT 0.0000,
  `generation` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `posx` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `posy` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `sp_atk_count` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `sp_atk0` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `sp_atk1` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `sp_atk2` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `sp_atk3` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `sp_atk4` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `cap_lev` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `owner_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `id` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `treasure_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `medal_attack` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `medal_defence` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `medal_dexterity` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `base_life` double(6, 4) UNSIGNED ZEROFILL NULL DEFAULT 0.0000,
  `max_life` double(6, 4) UNSIGNED ZEROFILL NULL DEFAULT 0.0000,
  `class` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `fidelity` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `life_rise` double(6, 4) UNSIGNED ZEROFILL NULL DEFAULT 0.0000,
  `attack_rate` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `defence_rate` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `dexterity_rate` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `state` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `hue0` tinyint(4) UNSIGNED NOT NULL DEFAULT 0,
  `saturation0` tinyint(4) NOT NULL DEFAULT 0,
  `bright0` tinyint(4) NOT NULL DEFAULT 0,
  `hue1` tinyint(4) UNSIGNED NOT NULL DEFAULT 0,
  `saturation1` tinyint(4) NOT NULL DEFAULT 0,
  `bright1` tinyint(4) NOT NULL DEFAULT 0,
  `hue2` tinyint(4) UNSIGNED NOT NULL DEFAULT 0,
  `saturation2` tinyint(4) NOT NULL DEFAULT 0,
  `bright2` tinyint(4) NOT NULL DEFAULT 0,
  `org_growrate` double(6, 4) UNSIGNED ZEROFILL NULL DEFAULT 0.0000,
  PRIMARY KEY (`id`),
  INDEX `index_ownerid`(`owner_id`)
) ENGINE = MyISAM AUTO_INCREMENT = 2 ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of yx_pet
-- ----------------------------
INSERT INTO `yx_pet` VALUES ('苦行龟', 0122, 6.8600, 9.0600, 4.5800, 6.8600, 9.0600, 4.5800, 0001, 0000, 0043, 4.0100, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0001, 0001, 0001, 0000, 0000, 0000, 0000, 43.6400, 43.6400, 72013, 0100, 3.7300, 0029, 0041, 0030, 0000, 7, 50, 32, 7, 50, 23, 21, 40, 45, 4.0100);

SET FOREIGN_KEY_CHECKS = 1;
