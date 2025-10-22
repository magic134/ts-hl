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

 Date: 21/10/2025 18:55:23
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for ball_card
-- ----------------------------
DROP TABLE IF EXISTS `ball_card`;
CREATE TABLE `ball_card`  (
  `id` int(12) UNSIGNED NOT NULL AUTO_INCREMENT,
  `card_id` varchar(12) NOT NULL DEFAULT '',
  `password` varchar(10) NOT NULL DEFAULT '',
  `type` int(1) UNSIGNED ZEROFILL NULL DEFAULT 1,
  `enable` int(2) UNSIGNED NOT NULL DEFAULT 1,
  `server` int(2) NULL DEFAULT NULL,
  `bonus_action` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `account_id` varchar(32) NULL DEFAULT NULL,
  `use_date` datetime NULL DEFAULT NULL,
  `txn_id` varchar(20) NOT NULL DEFAULT '0',
  `ip` varchar(15) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `index_card_id`(`card_id`),
  INDEX `index_account_id`(`account_id`),
  INDEX `index_use_date`(`use_date`),
  INDEX `index_bonus_action`(`bonus_action`)
) ENGINE = MyISAM AUTO_INCREMENT = 1 ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
