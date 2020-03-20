
set(TARGET testing)

cmake_minimum_required(VERSION 3.16)
project(${TARGET})

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_ARCHIVE_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)
set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/lib)
set(CMAKE_RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin)


include(CodeCoverage)
append_coverage_compiler_flags()

add_executable(${TARGET} src/main.cpp )
target_include_directories(${TARGET} PUBLIC ${hello_SOURCE_DIR}/src)

