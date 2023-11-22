package com.biamavang.web.entity

import javax.persistence.*

@Entity
@Table(name = "CUSTOMER")
data class CustomerEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    val id: Long,

    @Column
    val name: String,

    @Column
    val phoneNumber: String,

    @Column
    val email: String?,

    @ManyToOne
    val universityEntity: UniversityEntity,

    @OneToOne
    val transactionEntity: TransactionEntity,

    @OneToOne(mappedBy = "customer")
    val userEntity: UserEntity
)
