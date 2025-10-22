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

 Date: 21/10/2025 18:56:22
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_bonus
-- ----------------------------
DROP TABLE IF EXISTS `yx_bonus`;
CREATE TABLE `yx_bonus`  (
  `serianumber` char(16) NOT NULL DEFAULT '',
  `password` char(16) NOT NULL DEFAULT '',
  `action` int(5) UNSIGNED ZEROFILL NOT NULL DEFAULT 00000,
  `id` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `serianumber`(`serianumber`)
) ENGINE = MyISAM AUTO_INCREMENT = 1 ROW_FORMAT = Fixed;

SET FOREIGN_KEY_CHECKS = 1;
