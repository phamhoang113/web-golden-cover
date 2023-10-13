package com.biamavang.web.entity

import javax.persistence.*

@Entity
@Table(name = "GOLD_COVER")
class GoldCover (
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long,

    @Column(name = "Image")
    val image: String,

)