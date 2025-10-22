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

 Date: 21/10/2025 18:59:34
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_user
-- ----------------------------
DROP TABLE IF EXISTS `yx_user`;
CREATE TABLE `yx_user`  (
  `name` varchar(16) NULL DEFAULT '',
  `mate` varchar(16) NULL DEFAULT '',
  `monicker` varchar(16) NULL DEFAULT '',
  `look` int(4) NULL DEFAULT 0,
  `face` int(4) NULL DEFAULT 0,
  `life` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `power` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `money` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `money_saved` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `repute` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `level` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `exp` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `exp_smith` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `exp_creative` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `exp_medicine` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `exp_steal` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `physique` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `stamina` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `force` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `speed` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `degree` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `recordx` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `recordy` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `recordmap_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `metempsychosis` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `deed` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `additional_point` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `task_mask` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `pk_enable` int(4) NULL DEFAULT 0,
  `home_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `syndicate_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `pet_count` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `petused_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `pet0_id` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `pet1_id` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `pet2_id` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `pet3_id` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `pet4_id` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `skill_count` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill0_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill1_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill2_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill3_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill4_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill5_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill6_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill7_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill8_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill9_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `skill10_id` int(4) NOT NULL DEFAULT 0,
  `weapon_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `armor_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `shoes_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `treasure0_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `treasure1_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `account_id` int(4) UNSIGNED ZEROFILL NULL DEFAULT 0000,
  `id` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `degree_lev` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `lockkey` int(4) UNSIGNED NULL DEFAULT 0,
  `intellect` int(4) UNSIGNED NULL DEFAULT 0,
  `quiz_point` int(4) UNSIGNED NULL DEFAULT 0,
  `coin_money` int(4) NULL DEFAULT NULL,
  `marriage` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `last_login` int(8) UNSIGNED NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `col1`(`account_id`),
  INDEX `col2`(`name`),
  INDEX `index_create`(`exp_creative`),
  INDEX `index_steal`(`exp_steal`),
  INDEX `index_degree_level`(`degree_lev`),
  INDEX `index_medicine`(`exp_medicine`),
  INDEX `index_smith`(`exp_smith`),
  INDEX `index_degree`(`degree_lev`),
  INDEX `index_pk`(`pk_enable`),
  INDEX `index_money`(`money_saved`),
  INDEX `index_login`(`last_login`, `level`)
) ENGINE = MyISAM AUTO_INCREMENT = 4 ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of yx_user
-- ----------------------------
INSERT INTO `yx_user` VALUES ('太古幻灵[PM]', '无', '太古幻灵', 0, 1, 0030, 0020, 0100, 0000, 0000, 0001, 0000, 0000, 0000, 0000, 0000, 0001, 0011, 0007, 0005, 0001, 0012, 0015, 140000, 0000, 0000, 0000, 0000, 0, 0000, 0000, 0001, 0001, 0001, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0, 0000, 0000, 0000, 0000, 0000, 0001, 0001, 0000, 0, 0, 0, NULL, NULL, 20200507);
INSERT INTO `yx_user` VALUES ('测试用户', '称号', '新幻灵', 0, 1, 0030, 0020, 0200, 0000, 0000, 0001, 0000, 0000, 0000, 0000, 0000, 0001, 0011, 0007, 0005, 0001, 0012, 0015, 140000, 0000, 0000, 0000, 0000, 0, 0000, 0000, 0001, 0001, 0001, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0, 0000, 0000, 0000, 0000, 0000, 0001, 0002, 0000, 0, 0, 0, 0, NULL, 20240101);
INSERT INTO `yx_user` VALUES ('张三', '称号', '新幻灵', 0, 1, 0030, 0020, 0200, 0000, 0000, 0001, 0000, 0000, 0000, 0000, 0000, 0001, 0011, 0007, 0005, 0001, 0012, 0015, 140000, 0000, 0000, 0000, 0000, 0, 0000, 0000, 0001, 0001, 0001, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0000, 0, 0000, 0000, 0000, 0000, 0000, 0001, 0003, 0000, 0, 0, 0, 0, NULL, 20240101);

SET FOREIGN_KEY_CHECKS = 1;
