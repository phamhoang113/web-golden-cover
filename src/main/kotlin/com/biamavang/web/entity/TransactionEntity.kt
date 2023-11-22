package com.biamavang.web.entity

import com.biamavang.web.common.enums.TransactionStatusEnum
import java.math.BigDecimal
import java.time.Instant
import java.util.*
import javax.persistence.*

@Entity
@Table(name = "TRANSACTION")
data class TransactionEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long,

    val totalPrice: BigDecimal,

    @Temporal(TemporalType.TIMESTAMP)
    val tranTime: Date = Date.from(Instant.now()),

    @OneToMany(mappedBy = "transactionEntity")
    val subTransactionEntity: ArrayList<SubTransactionEntity>,

    @OneToOne(mappedBy = "transactionEntity")
    val customer: CustomerEntity,

    val status: TransactionStatusEnum = TransactionStatusEnum.INIT
)
