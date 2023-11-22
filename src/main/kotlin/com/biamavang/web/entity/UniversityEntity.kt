package com.biamavang.web.entity

import java.math.BigDecimal
import javax.persistence.*

@Entity
@Table(name = "UNIVERSITY")
data class UniversityEntity (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long,

    val name: String,

    val discount: BigDecimal = BigDecimal.ZERO,

    @ManyToMany
    val goldCoverEntities: ArrayList<GoldCoverEntity>,

    @OneToMany(mappedBy = "universityEntity")
    val customer: ArrayList<CustomerEntity>
)