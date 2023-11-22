package com.biamavang.web.entity

import java.math.BigDecimal
import javax.persistence.*

@Entity
@Table(name = "SUB_TRANSACTION")
data class SubTransactionEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long,
    @OneToOne
    val goldCoverEntity: GoldCoverEntity,

    val quantity: Int,
    val nameFile: String,
    val fileType: String,
    val data: ByteArray,

    val days: Int,

    val price: BigDecimal,

    @ManyToOne
    val transactionEntity: TransactionEntity
)
