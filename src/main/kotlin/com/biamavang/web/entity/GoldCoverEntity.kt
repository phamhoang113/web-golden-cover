package com.biamavang.web.entity

import javax.persistence.*

@Entity
@Table(name = "GOLD_COVER")
data class GoldCoverEntity (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long,

    @Column
    val image: String,

    @Column
    val title: String,

    @ManyToMany(mappedBy = "goldCoverEntities")
    val universityEntities: ArrayList<UniversityEntity>,

    @OneToOne(mappedBy = "goldCoverEntity")
    val subTransactionEntity: SubTransactionEntity
)