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

 Date: 21/10/2025 18:59:49
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_usercolor
-- ----------------------------
DROP TABLE IF EXISTS `yx_usercolor`;
CREATE TABLE `yx_usercolor`  (
  `id_user` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `hue0` tinyint(3) UNSIGNED ZEROFILL NOT NULL DEFAULT 000,
  `saturation0` tinyint(3) UNSIGNED ZEROFILL NOT NULL DEFAULT 000,
  `bright0` tinyint(3) UNSIGNED ZEROFILL NOT NULL DEFAULT 000,
  `hue1` tinyint(3) UNSIGNED ZEROFILL NOT NULL DEFAULT 000,
  `saturation1` tinyint(3) UNSIGNED ZEROFILL NOT NULL DEFAULT 000,
  `bright1` tinyint(3) UNSIGNED ZEROFILL NOT NULL DEFAULT 000,
  `hue2` tinyint(3) UNSIGNED ZEROFILL NOT NULL DEFAULT 000,
  `saturation2` tinyint(3) UNSIGNED ZEROFILL NOT NULL DEFAULT 000,
  `bright2` tinyint(3) UNSIGNED ZEROFILL NOT NULL DEFAULT 000,
  `hue3` tinyint(3) UNSIGNED ZEROFILL NOT NULL DEFAULT 000,
  `saturation3` tinyint(3) UNSIGNED ZEROFILL NOT NULL DEFAULT 000,
  `bright3` tinyint(3) UNSIGNED ZEROFILL NOT NULL DEFAULT 000,
  `hue4` tinyint(3) UNSIGNED ZEROFILL NOT NULL DEFAULT 000,
  `saturation4` tinyint(3) UNSIGNED ZEROFILL NOT NULL DEFAULT 000,
  `bright4` tinyint(3) UNSIGNED ZEROFILL NOT NULL DEFAULT 000,
  UNIQUE INDEX `id_user`(`id_user`)
) ENGINE = MyISAM ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of yx_usercolor
-- ----------------------------
INSERT INTO `yx_usercolor` VALUES (0001, 020, 038, 064, 020, 033, 048, 106, 001, 032, 108, 016, 032, 023, 043, 064);

SET FOREIGN_KEY_CHECKS = 1;
