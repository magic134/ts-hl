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

 Date: 21/10/2025 18:58:59
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_storage
-- ----------------------------
DROP TABLE IF EXISTS `yx_storage`;
CREATE TABLE `yx_storage`  (
  `id` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `id_user` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `id_map` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `type` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `item0` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `item1` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `item2` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `item3` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `item4` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `item5` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `item6` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `item7` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `id_user`(`id_user`),
  INDEX `id_map`(`id_map`),
  INDEX `type`(`type`)
) ENGINE = MyISAM AUTO_INCREMENT = 1 ROW_FORMAT = Fixed;

SET FOREIGN_KEY_CHECKS = 1;
