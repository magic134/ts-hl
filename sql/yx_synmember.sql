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

 Date: 21/10/2025 18:59:19
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_synmember
-- ----------------------------
DROP TABLE IF EXISTS `yx_synmember`;
CREATE TABLE `yx_synmember`  (
  `id` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `name` char(15) NOT NULL DEFAULT '',
  `rank` int(4) NOT NULL DEFAULT 0,
  `priv` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `title` char(15) NOT NULL DEFAULT '',
  `owner_id` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `sub_id` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `intro_id` int(4) UNSIGNED NOT NULL DEFAULT 0,
  `intro_name` char(15) NOT NULL DEFAULT '',
  `offer_money` int(4) NOT NULL DEFAULT 0,
  `offer_intro` int(4) NOT NULL DEFAULT 0,
  `offer_fight` int(4) NOT NULL DEFAULT 0,
  `offer_build` int(4) NOT NULL DEFAULT 0,
  `offer_intro_newly` int(4) NOT NULL DEFAULT 0,
  `del_flag` int(4) NOT NULL DEFAULT 0,
  `fealty` char(15) NOT NULL DEFAULT '无',
  PRIMARY KEY (`id`),
  INDEX `index_owner_id`(`owner_id`),
  INDEX `order_offer_money`(`offer_money`),
  INDEX `index_1`(`owner_id`, `sub_id`, `rank`),
  INDEX `index_2`(`name`, `owner_id`)
) ENGINE = MyISAM ROW_FORMAT = Fixed;

SET FOREIGN_KEY_CHECKS = 1;
