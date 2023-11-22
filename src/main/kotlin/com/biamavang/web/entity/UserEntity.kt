package com.biamavang.web.entity

import javax.persistence.*

@Entity
@Table(name = "USER")
data class UserEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long,

    val username: String,

    val password: String,

    @OneToOne
    val customer: CustomerEntity
)
