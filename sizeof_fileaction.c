
#include <stdio.h>
#include <spawn.h>

int main() {
  printf("sizeof(posix_spawn_file_actions_t)=%ld\n", sizeof(posix_spawn_file_actions_t));
  return 0;
}
