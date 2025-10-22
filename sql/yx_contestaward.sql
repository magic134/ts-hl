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

 Date: 21/10/2025 18:56:34
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for yx_contestaward
-- ----------------------------
DROP TABLE IF EXISTS `yx_contestaward`;
CREATE TABLE `yx_contestaward`  (
  `id` int(4) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT,
  `id_user` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `id_action` int(4) UNSIGNED ZEROFILL NOT NULL DEFAULT 0000,
  `flad` int(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `id_user`(`id_user`)
) ENGINE = MyISAM AUTO_INCREMENT = 8553 ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of yx_contestaward
-- ----------------------------
INSERT INTO `yx_contestaward` VALUES (2829, 18991, 10000146, 0);
INSERT INTO `yx_contestaward` VALUES (8552, 28781, 10000146, 0);
INSERT INTO `yx_contestaward` VALUES (7637, 19353, 10000141, 0);

SET FOREIGN_KEY_CHECKS = 1;
