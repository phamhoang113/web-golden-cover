package com.biamavang.web.controller

import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import javax.servlet.http.HttpServletRequest

@Controller
class ContactController {

    @GetMapping("/contact")
    fun view(model: Model, request: HttpServletRequest): String {
        return "contact"
    }
}