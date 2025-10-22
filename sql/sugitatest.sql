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

 Date: 21/10/2025 18:55:54
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for sugitatest
-- ----------------------------
DROP TABLE IF EXISTS `sugitatest`;
CREATE TABLE `sugitatest`  (
  `num` int(4) UNSIGNED ZEROFILL NULL DEFAULT NULL,
  `str` char(32) NULL DEFAULT NULL
) ENGINE = MyISAM ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of sugitatest
-- ----------------------------
INSERT INTO `sugitatest` VALUES (0001, '冬至幻灵');

SET FOREIGN_KEY_CHECKS = 1;
