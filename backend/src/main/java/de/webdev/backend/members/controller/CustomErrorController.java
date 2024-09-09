package de.webdev.backend.members.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.error.ErrorController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequiredArgsConstructor
@RequestMapping
public class CustomErrorController implements ErrorController {


	@GetMapping("/error")
	public String handleError() {
		return "redirect:/";
	}
}