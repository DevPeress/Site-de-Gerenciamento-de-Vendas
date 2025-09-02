-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `idade` INTEGER NOT NULL,
    `loc` VARCHAR(191) NOT NULL,
    `cell` VARCHAR(191) NOT NULL,
    `rg` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuario_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vendas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idLoja` INTEGER NOT NULL,
    `comprador` INTEGER NOT NULL,
    `rg` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `order` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Produtos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idLoja` INTEGER NOT NULL,
    `produto` VARCHAR(191) NOT NULL,
    `desc` VARCHAR(191) NOT NULL DEFAULT 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    `icone` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empresas` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idLoja` INTEGER NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `budget` INTEGER NOT NULL DEFAULT 0,
    `customers` INTEGER NOT NULL DEFAULT 0,
    `grafico` JSON NOT NULL,

    UNIQUE INDEX `Empresas_idLoja_key`(`idLoja`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Funcionarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idLoja` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `cargo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
