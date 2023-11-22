package com.biamavang.web.entity

import java.math.BigDecimal
import javax.persistence.*

@Entity
@Table(name = "GROUP_USER")
data class GroupUserEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long,

    val name: String,

    val discount: BigDecimal,

    val fromPoint: BigDecimal,

    val toPoint: BigDecimal
)
